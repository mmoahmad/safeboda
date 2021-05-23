defmodule SafebodaWeb.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :busi_api,
    module: SafebodaWeb.Auth.Guardian,
    error_handler: SafebodaWeb.Auth.ErrorHandler

  plug Guardian.Plug.VerifyHeader
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
