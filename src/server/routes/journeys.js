import journeys from '../fixtures/journeys.json' assert { type: "json" };

/**
 * A simple request handler example, returning the entire list of mocked journeys.
 */
export default (_req, res) => res.json(journeys);
