async function getFullProviders(req, res) {
  try {
    const providers = await res.locals.store.getFullProviders();
    const formattedProviders = providers.map((provider) => ({
      id: provider.id,
      first_name: provider.first_name,
      last_name: provider.last_name,
      specialty: provider.specialty,
      city: provider.city,
      phone_number: provider.phone_number,
      average_app_time: provider.average_app_time,
      photo: provider.photo,
    }));
    return res.status(200).json(formattedProviders);
  } catch (err) {
    return res.status(401).json('Database issue');
  }
}

module.exports = getFullProviders;
