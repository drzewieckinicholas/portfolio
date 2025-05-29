import type { MetaFunction } from '@remix-run/node';
import { useEffect } from 'react';

import type { Handle } from '~/types';

export const meta: MetaFunction = () => {
  return [{ title: 'Nicholas Drzewiecki' }];
};

export const handle: Handle = {
  heading: 'Nicholas Drzewiecki',
};

export default function Index() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: 'view_item',
      ecommerce: {
        currency: 'CAD',
        value: 30.03,
        items: [
          {
            affiliation: 'Google Merchandise Store',
            coupon: 'SUMMER_FUN',
            discount: 2.22,
            index: 0,
            item_brand: 'Google',
            item_category: 'Apparel',
            item_category2: 'Adult',
            item_category3: 'Shirts',
            item_category4: 'Crew',
            item_category5: 'Short sleeve',
            item_id: 'SKU_12345',
            item_list_id: 'related_products',
            item_list_name: 'Related Products',
            item_name: 'Stan and Friends Tee',
            item_variant: 'green',
            location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
            price: 10.01,
            quantity: 3,
          },
        ],
      },
    });
  }, []);

  return (
    <article className='prose'>
      <h2>Foo</h2>
      <p>Lorem ipsum dolor sit amet</p>
    </article>
  );
}
