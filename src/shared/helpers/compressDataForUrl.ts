import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'

export const compressDataForUrl = (data: unknown): string => {
  try {
    const jsonData = JSON.stringify(data)

    return compressToEncodedURIComponent(jsonData)
  } catch (error) {
    console.error('Error during data compression for URL:', error)
  }

  return ''
}

export const decompressDataFromUrl = <T = unknown>(input: string): T | null => {
  try {
    const json = decompressFromEncodedURIComponent(input)

    return JSON.parse(json)
  } catch (error) {
    console.error('Error during data compression for URL:', error)
  }

  return null
}
