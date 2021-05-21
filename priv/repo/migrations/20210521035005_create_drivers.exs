defmodule Safeboda.Repo.Migrations.CreateDrivers do
  use Ecto.Migration

  def change do
    create table(:drivers) do
      add :name, :string
      add :phone_number, :string
      add :is_suspended, :boolean, default: false
      timestamps()
    end
  end
end
