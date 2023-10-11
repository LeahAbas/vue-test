import { describe, expect, it } from 'vitest'
import { getWeatherReport } from '../../api/requests'; 
import MockAdapter from 'axios-mock-adapter';
import { weatherApi } from "../../api/axios";

const mock = new MockAdapter(weatherApi);

describe('getWeatherReport', () => {
  it('fetches weather data successfully', async () => {
    const mockResponse = {
      current: {
        temp: 25,
      },
      daily: [
        {
          temp: {
            max: 30,
            min: 20,
          },
        },
      ],
    };


    mock.onGet(/data\/2.5\/onecall/).reply(200, mockResponse);
    const lat = 12.34;
    const lon = 56.78;

    const result = await getWeatherReport(lat, lon);

    expect(result).toEqual(mockResponse);
  });
});

