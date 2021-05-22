defmodule SafebodaWeb.DriverController do
  use SafebodaWeb, :controller

  alias Safeboda.Accounts
  alias Safeboda.Accounts.Driver
  alias Safeboda.Common.Util

  def index(conn, _params) do
    drivers = Accounts.list_drivers()

    conn
    |> put_status(200)
    |> json(%{success: true, drivers: Driver.to_json(drivers)})
  end

  def create(conn, params) do
    params = Util.underscore_keys(params)

    case Accounts.create_driver(params) do
      {:ok, %Driver{} = driver} ->
        conn
        |> put_status(:created)
        |> json(%{success: true, driver: Driver.to_json(driver)})

      {:error, changeset} ->
        IO.inspect(changeset)

        conn
        |> put_status(400)
        |> json(%{success: false, driver: %{}})
    end
  end

  def suspend(conn, %{"driverid" => driver_id}) do
    IO.puts("suspend func")
    driver = Accounts.get_driver!(driver_id)

    case Accounts.update_driver(driver, %{"is_suspended" => true}) do
      {:ok, %Driver{}} ->
        conn
        |> put_status(204)
        |> json(%{success: true})

      {:error, changeset} ->
        IO.inspect(changeset)

        conn
        |> put_status(400)
        |> json(%{success: false})
    end
  end

  def unsuspend(conn, %{"driverid" => driver_id}) do
    IO.puts("unsuspend func")
    driver = Accounts.get_driver!(driver_id)

    case Accounts.update_driver(driver, %{"is_suspended" => false}) do
      {:ok, %Driver{}} ->
        conn
        |> put_status(204)
        |> json(%{success: true})

      {:error, changeset} ->
        IO.inspect(changeset)

        conn
        |> put_status(400)
        |> json(%{success: false})
    end
  end
end
