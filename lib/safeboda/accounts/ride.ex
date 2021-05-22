defmodule Safeboda.Accounts.Ride do
  use Ecto.Schema
  import Ecto.Changeset

  schema "rides" do
    field :pick_up_latitude, :decimal
    field :pick_up_longitude, :decimal
    field :destination_latitude, :decimal
    field :destination_longitude, :decimal
    field :status

    belongs_to :driver, Safeboda.Accounts.Driver
    belongs_to :passenger, Safeboda.Accounts.Passenger
    timestamps()
  end

  @doc false
  def changeset(ride, attrs) do
    ride
    |> cast(attrs, [
      :driver_id,
      :passenger_id,
      :pick_up_latitude,
      :pick_up_longitude,
      :destination_latitude,
      :destination_longitude,
      :status
    ])
    |> validate_required([
      :driver_id,
      :passenger_id,
      :pick_up_latitude,
      :pick_up_longitude,
      :destination_latitude,
      :destination_longitude,
      :status
    ])
  end

  @doc false
  def update_changeset(ride, attrs) do
    ride
    |> cast(attrs, [:status])
  end

  def to_json(list) when is_list(list) do
    for self <- list do
      to_json(self)
    end
  end

  def to_json(%__MODULE__{
        id: id,
        driver_id: driver_id,
        passenger_id: passenger_id,
        status: status
      }) do
    %{
      id: id,
      driverId: driver_id,
      passengerId: passenger_id,
      status: status
    }
  end

  def to_json(_), do: nil
end
