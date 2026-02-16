# DDD (Domain Driven Design) во фронтенде React

## Идея

Разбиваем приложение на поддомены и для каждого поддомена создаём слои:
- **feature** — умные компоненты (контейнеры)
- **ui** — глупые презентационные компоненты
- **domain** — бизнес-логика
- **utils** — утилиты домена

NX помогает держать чёткие границы между модулями.

---

## 1. Разбиение на поддомены

Выделяешь **bounded context'ы** приложения и даёшь им имена поддоменов, например:

- **catalog** — каталог товаров, фильтры, поиск
- **cart** — корзина, оформление
- **auth** — вход, профиль, права
- **orders** — заказы, история

Каждый поддомен — отдельный «модуль» с чёткими границами (NX как раз помогает их держать).

---

## 2. Структура папок для одного поддомена (например, `catalog`)

```
apps/my-app/src/
  catalog/                    # поддомен
    feature/                  # умные компоненты (контейнеры)
      CatalogPage/
      ProductFilters/
      SearchBar/
    ui/                       # глупые компоненты (presentational)
      ProductCard/
      FilterChip/
      SearchInput/
    domain/                   # бизнес-логика
      entities/               # сущности домена
      services/               # доменные сервисы
      store/                  # или слой данных (store/slice)
      types.ts
    utils/                    # утилиты только для этого домена
      formatPrice.ts
      buildSearchQuery.ts
```

Зависимости: **feature** знает про **domain** и **ui**, **ui** не знает про domain и фичи, **domain** не знает про React и UI.

---

## 3. Роли слоёв

| Слой     | Назначение                                                                 | Примеры                          |
|----------|----------------------------------------------------------------------------|----------------------------------|
| **feature** | Умные компоненты: данные (store/API), доменная логика, композиция UI       | `CatalogPage`, `ProductFiltersContainer` |
| **ui**      | Только пропсы и отображение, без знания домена                             | `ProductCard`, `FilterChip`, `Button`    |
| **domain**  | Сущности, правила, типы, сервисы домена                                    | `Product`, `applyFilters()`, `CatalogStore` |
| **utils**   | Вспомогательные функции только для этого домена                            | форматирование, построение запросов      |

---

## 4. Пример кода

### domain/catalog/types.ts

```ts
// Сущности и типы домена catalog
export interface Product {
  id: string;
  title: string;
  price: number;
  categoryId: string;
}

export interface CatalogFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}
```

### domain/catalog/services/filterProducts.ts

```ts
import type { Product, CatalogFilters } from '../types';

export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  return products.filter((p) => {
    if (filters.categoryId && p.categoryId !== filters.categoryId) return false;
    if (filters.minPrice != null && p.price < filters.minPrice) return false;
    if (filters.maxPrice != null && p.price > filters.maxPrice) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      if (!p.title.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}
```

### ui/ProductCard/ProductCard.tsx

```tsx
// Глупый компонент — только отображение
interface ProductCardProps {
  title: string;
  price: string; // уже отформатировано
  onAddToCart: () => void;
}

export function ProductCard({ title, price, onAddToCart }: ProductCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <span>{price}</span>
      <button onClick={onAddToCart}>В корзину</button>
    </div>
  );
}
```

### feature/CatalogPage/CatalogPage.tsx

```tsx
// Умный компонент — данные + домен + композиция UI
import { useCatalogStore } from '../../domain/store/catalogStore';
import { filterProducts } from '../../domain/services/filterProducts';
import { formatPrice } from '../../utils/formatPrice';
import { ProductCard } from '../../ui/ProductCard/ProductCard';

export function CatalogPage() {
  const { products, filters } = useCatalogStore();
  const filtered = filterProducts(products, filters);

  return (
    <div>
      {filtered.map((p) => (
        <ProductCard
          key={p.id}
          title={p.title}
          price={formatPrice(p.price)}
          onAddToCart={() => {}}
        />
      ))}
    </div>
  );
}
```

Так **feature** остаётся единственным местом, где склеиваются домен (типы, сервисы, store) и UI.

---

## 5. Как помогает NX

- **libs/** — каждый поддомен можно оформить как библиотеку: `libs/catalog/`, `libs/cart/`.
- **Границы**: в `project.json` / `tsconfig` задаёшь, что `catalog` не импортирует из `cart` (или только через явные публичные API).
- **Публичный API**: в каждом lib — `index.ts`, который экспортирует только то, что разрешено использовать снаружи (например, только `feature` и типы), а внутренние папки `domain/`, `utils/` остаются приватными.

Пример структуры в NX:

```
libs/
  catalog/
    src/
      index.ts          # публичный API
      feature/
      ui/
      domain/
      utils/
    project.json
  cart/
    src/
      ...
```

---

## 6. Кратко

- Делишь приложение на поддомены (catalog, cart, auth, orders…).
- В каждом поддомене: **feature** (умные компоненты) → **ui** (глупые) → **domain** (логика и сущности) → **utils**.
- Зависимости: только «внутрь» к domain и utils; UI не зависит от domain и feature.
- NX используешь для модулей (libs) и строгих границ между поддоменами.
