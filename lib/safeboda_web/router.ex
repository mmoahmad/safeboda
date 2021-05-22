defmodule SafebodaWeb.Router do
  use SafebodaWeb, :router
  import Plug.BasicAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    # plug :basic_auth, Application.compile_env(:safeboda, :basic_auth)
  end

  scope "/", SafebodaWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", SafebodaWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: SafebodaWeb.Telemetry
    end

    scope "/api", SafebodaWeb do
      pipe_through :api

      # driver routes
      get("/drivers", DriverController, :index)
      post("/driver", DriverController, :create)
      post("/driver/:driverid/suspend", DriverController, :suspend)
      delete("/driver/:driverid/suspend", DriverController, :unsuspend)

      # passenger route
      get("/passengers", PassengerController, :index)
      post("/passenger", PassengerController, :create)

      # ride routes
      get("/rides", RideConstroller, :index)
      post("/ride/:rideid/stop", RideConstroller, :stop)
      post("/ride/:passengerid/:driverid", RideConstroller, :create)
    end
  end
end
