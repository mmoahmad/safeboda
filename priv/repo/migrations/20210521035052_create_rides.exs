defmodule Safeboda.Repo.Migrations.CreateRides do
  use Ecto.Migration

  def change do
    create table(:rides) do
      add :pick_up_latitude, :string
      add :pick_up_longitude, :string
      add :destination_latitude, :string
      add :destination_longitude, :string
      add :status, Safeboda.RideStatus.type(), default: "ongoing"

      add :driver_id, references(:drivers), null: false
      add :passenger_id, references(:passengers), null: false
      timestamps()
    end
  end
end
