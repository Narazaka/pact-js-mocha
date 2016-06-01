var expect = require('chai').expect
var request = require('superagent-bluebird-promise')

var PROVIDER_URL = 'http://localhost:1234'

Pact('PactUI', 'Projects Provider', PROVIDER_URL, function () {

  var EXPECTED_BODY = [{
    id: 1,
    name: 'Project 1',
    due: '2016-02-11T09:46:56.023Z',
    tasks: [
      {id: 1, name: 'Do the laundry', 'done': true},
      {id: 2, name: 'Do the dishes', 'done': false},
      {id: 3, name: 'Do the backyard', 'done': false},
      {id: 4, name: 'Do nothing', 'done': false}
    ]
  }]

  add(function (interaction) {
    interaction
      .given('i have a list of projects')
      .uponReceiving('a request for projects')
      .withRequest('get', '/projects', null, { 'Accept': 'application/json' })
      .willRespondWith(200, { 'Content-Type': 'application/json' }, EXPECTED_BODY)
  })

  function requestProjects () {
    return request.get(PROVIDER_URL + '/projects').set({ 'Accept': 'application/json' })
  }

  verify('single interaction', requestProjects, function (result, done) {
    expect(JSON.parse(result)).to.eql(EXPECTED_BODY)
    done()
  })

})
