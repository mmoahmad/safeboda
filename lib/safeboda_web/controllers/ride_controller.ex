defmodule SafebodaWeb.RideConstroller do
  use SafebodaWeb, :controller

  alias Safeboda.Accounts
  alias Safeboda.Accounts.{Driver, Ride}
  alias Safeboda.Common.{Util, ErrorResponse}
  alias Safeboda.Repo

  def index(conn, _params) do
    rides = Accounts.list_ongoing_rides()

    conn
    |> put_status(200)
    |> json(%{success: true, rides: Ride.to_json(rides)})
  end

  def create(conn, %{"passengerid" => passenger_id, "driverid" => driver_id} = params) do
    params = Util.underscore_keys(params)

    with(
      false <- Accounts.ongoing_ride_exists?(passenger_id, driver_id),
      %Driver{is_suspended: is_suspended} <- Accounts.get_driver(driver_id),
      false <- is_suspended,
      {:ok, %Ride{} = ride} <- Accounts.create_ride(passenger_id, driver_id, params)
    ) do
      ride = ride |> Repo.preload([:driver, :passenger])

      conn
      |> put_status(200)
      |> json(%{success: true, ride: Ride.to_json(ride)})
    else
      true ->
        conn
        |> put_status(422)
        |> json(%{
          success: false,
          errors: "Passenger or driver have an on ongoing ride or driver is suspended."
        })

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect(changeset)

        conn
        |> put_status(400)
        |> json(%{success: false, errors: ErrorResponse.render_errors(changeset)})

      _ ->
        conn
        |> put_status(400)
        |> json(%{success: false})
    end
  end

  def stop(conn, %{"rideid" => ride_id}) do
    with(
      %Ride{} = ride <- Accounts.get_ride(ride_id),
      {:ok, %Ride{} = updated_ride} <-
        Accounts.update_ride(ride, %{"status" => "done"})
    ) do
      conn
      |> put_status(200)
      |> json(%{success: true, ride: Ride.to_json(updated_ride)})
    else
      _ ->
        conn
        |> put_status(400)
        |> json(%{success: false})
    end
  end
end
