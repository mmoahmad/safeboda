defmodule Safeboda.Accounts do
  import Ecto.Query, warn: false

  alias Safeboda.Repo
  # alias Safeboda.Accounts.{Driver, Passenger, Ride}
  alias Safeboda.Accounts.Driver

  @doc """
  Gets a single driver.

  ## Examples

      iex> get_driver!(123)
      %Driver{}
  """
  def get_driver!(driver_id), do: Repo.get!(Driver, driver_id)

  @doc """
  Creates a driver.

  ## Examples

      iex> create_driver(auth, attrs)
      %Driver{}
  """
  def create_driver(attrs \\ %{}) do
    %Driver{}
    |> Driver.changeset(attrs)
    |> Repo.insert()
  end

  def update_driver(%Driver{} = driver, attr \\ %{}) do
    driver
    |> Driver.changeset(attr)
    |> Repo.update()
  end
end
