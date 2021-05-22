defmodule Safeboda.Common.ErrorResponse do
  def render_errors(changeset) do
    Enum.map(changeset.errors, fn {field, detail} ->
      %{
        field: field,
        detail: render_detail(detail)
      }
    end)
  end

  defp render_detail({message, values}) do
    Enum.reduce(values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end)
  end

  defp render_detail(message) do
    message
  end
end
