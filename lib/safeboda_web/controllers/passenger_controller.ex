defmodule SafebodaWeb.PassengerController do
  use SafebodaWeb, :controller

  alias Safeboda.Accounts
  alias Safeboda.Accounts.Passenger
  alias Safeboda.Common.Util

  def index(conn, _params) do
    passengers = Accounts.list_passengers()

    conn
    |> put_status(200)
    |> json(%{success: true, passengers: Passenger.to_json(passengers)})
  end

  def create(conn, params) do
    params = Util.underscore_keys(params)

    case Accounts.create_passenger(params) do
      {:ok, %Passenger{} = passenger} ->
        conn
        |> put_status(:created)
        |> json(%{success: true, passenger: Passenger.to_json(passenger)})

      {:error, changeset} ->
        IO.inspect(changeset)

        conn
        |> put_status(400)
        |> json(%{success: false, passenger: %{}})
    end
  end
end
