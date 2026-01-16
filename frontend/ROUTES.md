## Routes Documentation

### Available Routes:

1. **Home Page**

   - `/` - Main homepage
   - `/home` - Alias for homepage

2. **Store Detail**

   - `/store/:id` - Individual store page with store ID

3. **Category/Filter Pages**

   - `/category/:categoryName` - Dynamic category pages
   - `/grocery` - Grocery & Kitchen section
   - `/snacks` - Snacks & Drinks section
   - `/beauty` - Beauty & Personal Care section
   - `/home-lifestyle` - Home & Lifestyle section
   - `/stores` - All stores listing

4. **404 Fallback**
   - `*` - Any undefined route redirects to homepage

### Route Parameters:

- `:id` - Store ID (numeric)
- `:categoryName` - Category name (kebab-case)

### State Passing:

Routes pass data via `location.state`:

- Store object for store details
- Category object for filter pages
