defmodule Safeboda.Repo.Migrations.CreateRides do
  use Ecto.Migration

  def change do
    Safeboda.RideStatus.create_type()

    create table(:rides) do
      add :pick_up_latitude, :decimal
      add :pick_up_longitude, :decimal
      add :destination_latitude, :decimal
      add :destination_longitude, :decimal
      add :status, Safeboda.RideStatus.type(), default: "ongoing"

      add :driver_id, references(:drivers), null: false
      add :passenger_id, references(:passengers), null: false
      timestamps()
    end
  end
end
