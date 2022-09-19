const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceNormalizedSnakeCase = string_.normalizer_snakecase(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
  const all${resourceDenormalized}Actions = {
    get${resourceDenormalized}:'get${resourceDenormalized}',
    manage${resourceDenormalized}:'manage${resourceDenormalized}'
  }
  
  const all${resourceDenormalized}ActionsWithLevel = {
    [all${resourceDenormalized}Actions.get${resourceDenormalized}]:3,
    [[all${resourceDenormalized}Actions.manage${resourceDenormalized}]]:1
  }

  export  {all${resourceDenormalized}Actions, all${resourceDenormalized}ActionsWithLevel}
`;
}

module.exports = literal