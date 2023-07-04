import stations from '../fixtures/stations.json' assert { type: "json" };

/**
 * A simple request handler example, returning the entire list of mocked stations.
 */
export default (_req, res) => res.json(stations);
