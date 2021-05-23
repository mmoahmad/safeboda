defmodule SafebodaWeb.UserController do
  use SafebodaWeb, :controller

  alias Safeboda.Accounts
  alias Safeboda.Accounts.User
  alias SafebodaWeb.Auth.Guardian
  alias Safeboda.Common.ErrorResponse

  def create(conn, %{"user" => user_params}) do
    with(
      {:ok, %User{} = user} <- Accounts.create_user(user_params),
      {:ok, token, _claims} <- Guardian.encode_and_sign(user)
    ) do
      conn
      |> put_status(200)
      |> json(%{success: true, token: token, user: User.to_json(user)})
    else
      {:error, changeset} ->
        IO.inspect(changeset)

        conn
        |> put_status(400)
        |> json(%{success: false, errors: ErrorResponse.render_errors(changeset)})

      _ ->
        conn
        |> put_status(400)
        |> json(%{success: false})
    end
  end

  def signin(conn, %{"email" => email, "password" => password} = _params) do
    with {:ok, user, token} <- Guardian.authenticate(email, password) do
      conn
      |> put_status(200)
      |> json(%{success: true, token: token, user: User.to_json(user)})
    else
      {:error, :unauthorized} ->
        conn
        |> put_status(401)
        |> json(%{success: false, status: "Unauthorized"})
    end
  end
end
