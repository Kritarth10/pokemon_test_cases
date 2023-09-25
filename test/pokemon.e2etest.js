const expect = require('chai').expect;
const should = require('chai').should();
const axios = require('axios');
const  jsonSchemaGenerator = require('json-schema-generator');
const baseURL = 'https://pokeapi.co/api/v2'

describe('Pokemon Number', function () {
    
      it('Pokémon number 812 should be Rillaboom', async function () {
        const response = await axios({
            method: 'get',
            url: baseURL+ '/pokemon/812',
          });
          expect(response).to.have.property('status', 200, `response: ${response.data}`)
          expect(response.data.name).to.equal('rillaboom');
      });
      it('5th generation of games should be set in Unova, and there should be two resources in the version groups array',async()=>{
        const response = await axios({
          method: 'get',
          url: baseURL+ '/generation/5',
        });
        expect(response).to.have.property('status', 200, `response: ${response.data}`);
        expect(response.data.name).to.equal('generation-v');
        expect(response.data.main_region.name).to.equal('unova');
        expect(response.data.version_groups.length).to.equal(2);
      })
      it('Verify that all Pokemon are there in kanto dex',async()=>{
        const response = await axios({
          method: 'get',
          url: baseURL+ '/pokedex/kanto/',
        });
        expect(response).to.have.property('status', 200, `response: ${response.data}`);
        expect(response.headers).to.have.property('content-type','application/json; charset=utf-8' );
        expect(response.headers.connection).to.equal('close');
        var dexName = response.data.name;
        dexName.should.be.a('string')
        expect(response.data.name).to.equal('kanto');
        expect(response.data.pokemon_entries.length).to.equal(151)
      })
      it('Verify that you get the responses as per limit and offset mentioned in the request',async()=>{
        const response = await axios({
          method: 'get',
          url: baseURL+ '/ability/?limit=20&offset=0',
        });
        expect(response).to.have.property('status', 200, `response: ${response.data}`);
        expect(response.data.results.length).to.equal(20);
        expect(response.data.results[0].url).to.equal("https://pokeapi.co/api/v2/ability/1/")
      })

      it('Verify that you get an error if incorrect path is provided',async()=>{
        const response = await axios({
          method: 'get',
          url: baseURL+ '/pokex/kanto/',
          validateStatus: () => true
        });
        expect(response).to.have.property('status', 404);
        expect(response.statusText).to.equal('Not Found');
      })

    }); 
