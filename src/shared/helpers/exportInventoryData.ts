const exportInventoryData = (data: unknown) => {
  const file = new Blob([JSON.stringify(data)], { type: 'text/plain' })

  // Create a link element, use it to download the Blob, and remove it
  const a = document.createElement('a')
  const url = URL.createObjectURL(file)
  a.href = url
  a.download = `PrincessHelpers.export.json`
  document.body.appendChild(a)
  a.click()

  // Cleanup: remove the temporary link and revoke the URL after download
  setTimeout(() => {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)
}

export default exportInventoryData
