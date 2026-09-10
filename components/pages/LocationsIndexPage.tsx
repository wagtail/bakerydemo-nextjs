import PictureCard from '@/components/cards/PictureCard';
import HeaderIndex from '@/components/headers/HeaderIndex';
import api from '@/lib/api';
import type { locations } from '@/models';
import type { PageComponentProps } from './types';

export default async function LocationsIndexPage({
  page,
}: PageComponentProps<locations.LocationsIndexPage>) {
  const { items: locationItems } = page.id
    ? await api.getPages('locations.LocationPage', {
        child_of: page.id.toString(),
      })
    : { items: [] };

  return (
    <>
      <HeaderIndex title={page.title} introduction={page.introduction} />

      <div className="container">
        <div className="location-list-page">
          {locationItems.map((location) => (
            <PictureCard
              key={location.id}
              url={location.meta.html_path}
              title={location.title}
              image={location.image_picture_card!}
            />
          ))}
        </div>
      </div>
    </>
  );
}
