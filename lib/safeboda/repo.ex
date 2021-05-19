defmodule Safeboda.Repo do
  use Ecto.Repo,
    otp_app: :safeboda,
    adapter: Ecto.Adapters.Postgres
end
