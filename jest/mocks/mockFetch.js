import {mockResponseCategory, mockResponseQuestion} from "./responseMock";

export function mockFetch() {
  global.fetch = jest.fn().mockImplementation((url) => new Promise(resolve =>
    setTimeout(() => {
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return Promise.resolve(
            url.includes('api_category') ?
              mockResponseCategory : mockResponseQuestion)
        },
      })
    }, 2000)
  ));
}
