/**
* @api {get} /api/calculate/sum/ sum
* @apiGroup Calculate
* @apiName Sum
* @apiVersion 0.1.0
* @apiPermission none
* @apiHeader (Authorization) {String} JWT JWT token for user authentication.
* @apiParam {number} [a=0] First number
* @apiParam {number} [b=0] Second number
* @apiDescription Callculate summ of two numbers, working via GET and not require authorization
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*       "sum" : "3"
*   }
*  @apiError UserNotFound The id of the User was not found.
*  @apiErrorExample Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "UserNotFound"
*     }
*/

//@apiSampleRequest /api/calculate/sum/?a=1&b=2
exports.sum = function(req, res){
	"use strict";
	var obj = {
		a : req.param('a') || 0,
		b : req.param('b') || 0
	};

	res.json({
		sum : parseInt(obj.a) + parseInt(obj.b)
	});
};