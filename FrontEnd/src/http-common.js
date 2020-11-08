import axios from "axios";

export default axios.create({
	// baseURL: "http://localhost:9090",
	baseURL: "https://quick-pick1.herokuapp.com",
	// baseURL: "https://backend-test-quickpick.herokuapp.com",
	headers: {
		"Content-type": "application/json"
	}
});