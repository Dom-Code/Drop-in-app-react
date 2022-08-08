
async function getPartialProviders(req, res) {
  const providers = await res.locals.store.getPartialProviders();
  const formattedProviders = providers.map((provider) => {
    const data = provider.row
      .slice(1, provider.row.length - 1)
      .split(',');
    return {
      id: data[0],
      first_name: data[1],
      last_name: data[2],
      specialty: data[3],
      city: data[4],
      photo: data[5],
    };
  });
  res.json(formattedProviders);
}

module.exports = getPartialProviders;


// getPartialProviders is loaded when the user is not logged in. 