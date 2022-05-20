export type AutocompletePrediction = google.maps.places.AutocompletePrediction;
export const googleAutocomplete = async (
  text: string,
): Promise<AutocompletePrediction[] | null | never> =>
  new Promise((resolve, reject) => {
    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        { input: text, types: ['(cities)'] },
        resolve,
      );
    } catch (e) {
      reject(e);
    }
  });

export default googleAutocomplete;
