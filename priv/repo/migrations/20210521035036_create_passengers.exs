defmodule Safeboda.Repo.Migrations.CreatePassengers do
  use Ecto.Migration

  def change do
    create table(:passengers) do
      add :name, :string
      add :phone_number, :string
      timestamps()
    end
  end
end
