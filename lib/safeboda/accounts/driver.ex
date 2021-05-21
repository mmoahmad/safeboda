defmodule Safeboda.Accounts.Driver do
  use Ecto.Schema
  import Ecto.Changeset

  schema "drivers" do
    field :name, :string
    field :phone_number, :string
    field :is_suspended, :boolean, default: false
    timestamps()
  end

  @doc false
  def changeset(driver, attrs) do
    driver
    |> cast(attrs, [:name, :phone_number, :is_suspended])
    |> validate_required([:name, :phone_number, :is_suspended])
  end

  @doc false
  def update_changeset(driver, attrs) do
    driver
    |> cast(attrs, [:is_suspended])
  end

  def to_json(list) when is_list(list) do
    for self <- list do
      to_json(self)
    end
  end

  def to_json(%__MODULE__{
        id: id,
        name: name,
        phone_number: phone_number,
        is_suspended: is_suspended
      }) do
    %{
      id: id,
      name: name,
      phoneNumber: phone_number,
      isSuspended: is_suspended
    }
  end

  def to_json(_), do: nil
end
