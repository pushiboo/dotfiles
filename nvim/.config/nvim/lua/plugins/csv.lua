return {
  "chrisbra/csv.vim",
  ft = { "csv", "dat" },
  config = function()
    -- Optional: Automatisch Spalten beim Öffnen ausrichten
    vim.api.nvim_create_autocmd("BufRead", {
      pattern = "*.csv",
      callback = function()
        vim.cmd("%ArrangeColumn")
      end,
    })
  end,
}   
