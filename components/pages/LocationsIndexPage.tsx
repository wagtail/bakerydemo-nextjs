import type { locations } from '@/models';
import type { PageComponentProps } from './types';
import LocationCard from '@/components/LocationCard';
import api from '@/lib/api';

export default async function LocationsIndexPage({
  page,
}: PageComponentProps<locations.LocationsIndexPage>) {
  // Get location pages that are children of the locations index page
  const { items: locations } = page.id
    ? await api.getPages('locations.LocationPage', {
        child_of: page.id.toString(),
      })
    : { items: [] };

  return (
    <>
      <section>
        <h1>{page.title}</h1>
        <p>{page.introduction}</p>
      </section>

      <section>
        {locations.length > 0 ? (
          locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))
        ) : (
          <p>No locations found.</p>
        )}
      </section>
    </>
  );
}
