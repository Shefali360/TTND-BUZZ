const PORT=3030;
const serverURI=`http://localhost:${PORT}`;

module.exports.buzzEndpoint="/buzz";
module.exports.buzzLikeEndpoint="/buzz/like";
module.exports.buzzDisikeEndpoint="/buzz/dislike";
module.exports.complaintsEndpoint="/complaint";
module.exports.allComplaintsEndpoint="/complaint/all";
module.exports.adminEndpoint="/admin";
module.exports.authTokenEndpoint="/authToken";
module.exports.logoutEndpoint="/logout";