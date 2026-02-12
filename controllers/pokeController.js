exports.getAllPokemon = async (req, res) => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    const data = await response.json();

    res.status(200).json(data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch Pokémon" });
  }
};
