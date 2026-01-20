export const BASE_URL_API = import.meta.env.BASE_URL;
export const STATUS = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  PASSED: 'PASSED'
}
export const CARD_IMAGE = [
  `${BASE_URL_API}assets/img/1.jpg`,
  `${BASE_URL_API}assets/img/2.jpg`,
  `${BASE_URL_API}assets/img/3.jpg`,
  `${BASE_URL_API}assets/img/4.jpg`,
  `${BASE_URL_API}assets/img/5.jpg`,
  `${BASE_URL_API}assets/img/6.jpg`,
  `${BASE_URL_API}assets/img/7.jpg`,
  `${BASE_URL_API}assets/img/8.jpg`
]
export const CARD_NUMBER = [
  {
    "id": 1,
    "value": 2,
    "image": "assets/img/number/number-2.jpg"
  },
  {
    "id": 2,
    "value": 4,
    "image": "assets/img/number/number-4.jpg"
  },
  {
    "id": 3,
    "value": 6,
    "image": "assets/img/number/number-6.jpg"
  },
  {
    "id": 4,
    "value": 8,
    "image": "assets/img/number/number-8.jpg"
  }
]