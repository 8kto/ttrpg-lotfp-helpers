import exportInventoryData from '@/shared/helpers/exportInventoryData'
import { stateMock } from '@/shared/mocks/stateMock'

describe('exportInventoryData', () => {
  // Mock global document and window objects
  const mockAppendChild = jest.fn()
  const mockRemoveChild = jest.fn()
  const mockClick = jest.fn()
  const mockCreateElement = jest.fn().mockImplementation(() => ({
    click: mockClick,
    download: '',
    href: '',
  }))
  const mockCreateObjectURL = jest.fn()
  const mockRevokeObjectURL = jest.fn()

  beforeAll(() => {
    global.document.createElement = mockCreateElement
    global.document.body.appendChild = mockAppendChild
    global.document.body.removeChild = mockRemoveChild
    global.URL.createObjectURL = mockCreateObjectURL
    global.URL.revokeObjectURL = mockRevokeObjectURL
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.useRealTimers()
  })

  it('creates and clicks a link to download data', () => {
    const testData = { item1: 'value1', item2: 'value2' }
    exportInventoryData(testData)

    expect(mockCreateElement).toHaveBeenCalledWith('a')
    expect(mockAppendChild).toHaveBeenCalledTimes(1)
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('sets correct attributes for download link', () => {
    const testData = { item1: 'value1', item2: 'value2' }
    exportInventoryData(testData)

    const linkElement = mockCreateElement.mock.results[0].value
    expect(linkElement.download).toEqual('PrincessHelpers.export.json')
  })

  it('cleans up by removing link and revoking object URL', () => {
    jest.useFakeTimers()

    const testData = { item1: 'value1', item2: 'value2' }
    exportInventoryData(testData)

    // Fast-forward time so that all pending callbacks are executed
    jest.runAllTimers()

    expect(mockRemoveChild).toHaveBeenCalledTimes(1)
    expect(mockRevokeObjectURL).toHaveBeenCalledTimes(1)
  })

  it('creates a downloadable file with the correct content', (done) => {
    let capturedBlob = null

    mockCreateObjectURL.mockImplementation(
      jest.fn((blob) => {
        capturedBlob = blob

        return 'blob-url'
      }),
    )

    exportInventoryData(stateMock)

    // Use FileReader to convert Blob to text
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result
      const data = JSON.parse(text as string)
      expect(data).toEqual(stateMock)
      done()
    }

    reader.readAsText(capturedBlob as unknown as Blob)
  })
})
