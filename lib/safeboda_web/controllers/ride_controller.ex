defmodule SafebodaWeb.RideConstroller do
  use SafebodaWeb, :controller

  alias Safeboda.Accounts
  alias Safeboda.Accounts.Ride

  def index(conn, _params) do
    rides = Accounts.list_ongoing_rides()

    conn
    |> put_status(200)
    |> json(%{success: true, rides: Ride.to_json(rides)})
  end

  def create(conn, %{"passengerid" => passenger_id, "driverid" => driver_id} = params) do
    if Accounts.ongoing_ride_exists?(passenger_id, driver_id) |> IO.inspect() do
      conn
      |> put_status(422)
      |> json(%{success: false, message: "Passenger or driver have an on ongoing ride."})
    else
      case Accounts.create_ride(passenger_id, driver_id, params) do
        {:ok, %Ride{} = ride} ->
          conn
          |> put_status(:created)
          |> json(%{success: true, ride: Ride.to_json(ride)})

        {:error, changeset} ->
          IO.inspect(changeset)

          conn
          |> put_status(400)
          |> json(%{success: false, ride: %{}})
      end
    end
  end

  def stop(conn, %{"rideid" => ride_id}) do
    with(
      {:ok, %Ride{} = ride} <- Accounts.get_ride(ride_id),
      {:ok, %Ride{} = updated_ride} <-
        Accounts.update_ride(ride, %{"status" => "done"}) |> IO.inspect()
    ) do
      conn
      |> put_status(202)
      |> json(%{success: true, ride: Ride.to_json(updated_ride)})
    else
      _ ->
        conn
        |> put_status(400)
        |> json(%{success: false, ride: %{}})
    end
  end
end
