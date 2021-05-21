defmodule Safeboda.Accounts.Passenger do
  use Ecto.Schema
  import Ecto.Changeset

  schema "passengers" do
    field :name, :string
    field :phone_number, :string
    timestamps()
  end

  @doc false
  def changeset(passenger, attrs) do
    passenger
    |> cast(attrs, [:name, :phone_number])
    |> validate_required([:name, :phone_number])
  end

  def to_json(list) when is_list(list) do
    for self <- list do
      to_json(self)
    end
  end

  def to_json(%__MODULE__{
        id: id,
        name: name,
        phone_number: phone_number
      }) do
    %{
      id: id,
      name: name,
      phoneNumber: phone_number
    }
  end

  def to_json(_), do: nil
end
