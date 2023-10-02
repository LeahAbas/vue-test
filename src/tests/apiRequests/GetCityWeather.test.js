
import { it, describe, expect } from "vitest";
import MockAdapter from 'axios-mock-adapter';
import { getCityWeather } from '../../api/requests';
import { weatherApi } from '../../api/axios';

const mock = new MockAdapter(weatherApi);


describe('getCityWeather', () => {

  it('fetches city weather data successfully', async () => {

    const mockResponse = {
      main: {
        temp: 25,
      },
    };

    mock.onGet(/data\/2.5\/weather/).reply(200, mockResponse);

    const lat = 12.34;
    const lon = 56.78;
    const result = await getCityWeather(lat, lon);

    expect(result).toEqual(mockResponse);
  });

});
