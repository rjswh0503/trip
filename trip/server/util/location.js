const axios = require('axios');
const HttpError = require('../models/http-error');

const googleAPI = process.env.GOOGLE_MAP_API_KEY;

async function getCoordsForAddress(address) {
    let response;

    try {
        response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleAPI}`
        );
    } catch (err) {
        throw new HttpError('주소 정보를 가져오지 못했습니다. (Google API 요청 실패)', 500);
    }

    const data = response.data;

    if (!data || data.status !== 'OK' || data.results.length === 0) {
        throw new HttpError('입력한 주소의 장소를 찾지 못했습니다.', 404);
    }

    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

module.exports = getCoordsForAddress;
