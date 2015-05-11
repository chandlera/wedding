exports.index = function (req, res) {
    res.render('index', { title: 'Home' });
};

exports.venue = function (req, res) {
    res.render('venue', { title: 'Venue' });
};

exports.accommodations = function (req, res) {
    res.render('accommodations', { title: 'Accommodations' });
};

exports.registry = function (req, res) {
    res.render('registry', { title: 'Registry' });
};

exports.weddingEvents = function (req, res) {
    res.render('events', { title: 'Events' });
};

exports.engagement = function (req, res) {
    res.render('engagement', { title: 'Engagement Photos' });
};

exports.filter = function (req, res) {
    res.render('filter', { title: 'Filters' });
};
