
  import { z } from "zod";

// <Schemas>
export type RichTextRemoval = z.infer<typeof RichTextRemoval>;
export const RichTextRemoval = z.object({ tag: z.string(), action: z.enum(["unwrapped", "removed"]), reason: z.enum(["feature_disabled", "unknown_linktype", "unknown_embedtype", "missing_attribute"]), attribute: z.string().nullable().optional(), detail: z.string().nullable().optional() });

export type BasePageMetaSchema = z.infer<typeof BasePageMetaSchema>;
export const BasePageMetaSchema = z.object({ type: z.string().nullable().optional(), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional() });

export type BasePageSchema = z.infer<typeof BasePageSchema>;
export const BasePageSchema = z.object({ meta: BasePageMetaSchema, id: z.number().int(), title: z.string() });

export type PagedBasePageSchema = z.infer<typeof PagedBasePageSchema>;
export const PagedBasePageSchema = z.object({ items: z.array(BasePageSchema), count: z.number().int() });

export type SimpleBasePageMetaSchema = z.infer<typeof SimpleBasePageMetaSchema>;
export const SimpleBasePageMetaSchema = z.object({ type: z.string().nullable(), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable(), detail_url: z.string().nullable(), html_url: z.string().nullable() }).partial();

export type SimpleBasePageSchema = z.infer<typeof SimpleBasePageSchema>;
export const SimpleBasePageSchema = z.object({ meta: SimpleBasePageMetaSchema, id: z.number().int(), title: z.string() });

export type BlogIndexPageMetaSchema = z.infer<typeof BlogIndexPageMetaSchema>;
export const BlogIndexPageMetaSchema = z.object({ type: z.literal("blog.BlogIndexPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type ImageMetaSchema = z.infer<typeof ImageMetaSchema>;
export const ImageMetaSchema = z.object({ type: z.literal("wagtailimages.Image"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type ImageForeignKeySchema = z.infer<typeof ImageForeignKeySchema>;
export const ImageForeignKeySchema = z.object({ meta: ImageMetaSchema, id: z.number().int().nullable().optional() });

export type BlogIndexPageSchema = z.infer<typeof BlogIndexPageSchema>;
export const BlogIndexPageSchema = z.object({ meta: BlogIndexPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), image: ImageForeignKeySchema.nullable().optional() });

export type abc__BlogPageMetaSchema__2 = z.infer<typeof abc__BlogPageMetaSchema__2>;
export const abc__BlogPageMetaSchema__2 = z.object({ type: z.literal("blog.BlogPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type BlogPageForeignKeySchema = z.infer<typeof BlogPageForeignKeySchema>;
export const BlogPageForeignKeySchema = z.object({ meta: abc__BlogPageMetaSchema__2, id: z.number().int().nullable().optional() });

export type abc__BlogPageMetaSchema__1 = z.infer<typeof abc__BlogPageMetaSchema__1>;
export const abc__BlogPageMetaSchema__1 = z.object({ type: z.literal("blog.BlogPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type BlogPersonRelationshipMetaSchema = z.infer<typeof BlogPersonRelationshipMetaSchema>;
export const BlogPersonRelationshipMetaSchema = z.object({ type: z.literal("blog.BlogPersonRelationship"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type PersonMetaSchema = z.infer<typeof PersonMetaSchema>;
export const PersonMetaSchema = z.object({ type: z.literal("base.Person"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type PersonForeignKeySchema = z.infer<typeof PersonForeignKeySchema>;
export const PersonForeignKeySchema = z.object({ meta: PersonMetaSchema, id: z.number().int().nullable().optional() });

export type BlogPersonRelationshipSchema = z.infer<typeof BlogPersonRelationshipSchema>;
export const BlogPersonRelationshipSchema = z.object({ meta: BlogPersonRelationshipMetaSchema, id: z.number().int().nullable().optional(), page: BlogPageForeignKeySchema.optional(), person: PersonForeignKeySchema.optional() });

export type BlogPageSchema = z.infer<typeof BlogPageSchema>;
export const BlogPageSchema = z.object({ meta: abc__BlogPageMetaSchema__1, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), subtitle: z.string().max(255).nullable().optional(), date_published: z.iso.date().nullable().optional(), image: ImageForeignKeySchema.nullable().optional(), body: z.array(z.unknown()).default([]), tags: z.array(z.string()).default([]), blog_person_relationship: z.array(BlogPersonRelationshipSchema).default([]), image_hero: z.unknown().optional(), image_listing: z.unknown().optional(), image_picture_card: z.unknown().optional() });

export type BreadPageMetaSchema = z.infer<typeof BreadPageMetaSchema>;
export const BreadPageMetaSchema = z.object({ type: z.literal("breads.BreadPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type CountryMetaSchema = z.infer<typeof CountryMetaSchema>;
export const CountryMetaSchema = z.object({ type: z.literal("breads.Country"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type CountryForeignKeySchema = z.infer<typeof CountryForeignKeySchema>;
export const CountryForeignKeySchema = z.object({ meta: CountryMetaSchema, id: z.number().int().nullable().optional() });

export type BreadTypeMetaSchema = z.infer<typeof BreadTypeMetaSchema>;
export const BreadTypeMetaSchema = z.object({ type: z.literal("breads.BreadType"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type BreadTypeForeignKeySchema = z.infer<typeof BreadTypeForeignKeySchema>;
export const BreadTypeForeignKeySchema = z.object({ meta: BreadTypeMetaSchema, id: z.number().int().nullable().optional() });

export type BreadPageSchema = z.infer<typeof BreadPageSchema>;
export const BreadPageSchema = z.object({ meta: BreadPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), ingredients: z.array(z.number().int()), image: ImageForeignKeySchema.nullable().optional(), body: z.array(z.unknown()).default([]), origin: CountryForeignKeySchema.nullable().optional(), bread_type: BreadTypeForeignKeySchema.nullable().optional(), image_hero: z.unknown().optional(), image_listing: z.unknown().optional() });

export type BreadsIndexPageMetaSchema = z.infer<typeof BreadsIndexPageMetaSchema>;
export const BreadsIndexPageMetaSchema = z.object({ type: z.literal("breads.BreadsIndexPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type BreadsIndexPageSchema = z.infer<typeof BreadsIndexPageSchema>;
export const BreadsIndexPageSchema = z.object({ meta: BreadsIndexPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), image: ImageForeignKeySchema.nullable().optional() });

export type CollectionMetaSchema = z.infer<typeof CollectionMetaSchema>;
export const CollectionMetaSchema = z.object({ type: z.literal("wagtailcore.Collection"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type CollectionForeignKeySchema = z.infer<typeof CollectionForeignKeySchema>;
export const CollectionForeignKeySchema = z.object({ meta: CollectionMetaSchema, id: z.number().int().nullable().optional() });

export type FormFieldMetaSchema = z.infer<typeof FormFieldMetaSchema>;
export const FormFieldMetaSchema = z.object({ type: z.literal("base.FormField"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type FormFieldSchema = z.infer<typeof FormFieldSchema>;
export const FormFieldSchema = z.object({ meta: FormFieldMetaSchema, id: z.number().int().nullable().optional(), clean_name: z.string().max(255).nullable().default(""), label: z.string().max(255), field_type: z.string().max(16), help_text: z.string().max(255).nullable().optional(), required: z.boolean().default(true), choices: z.string().nullable().optional(), default_value: z.string().nullable().optional() });

export type FormPageMetaSchema = z.infer<typeof FormPageMetaSchema>;
export const FormPageMetaSchema = z.object({ type: z.literal("base.FormPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type FormPageSchema = z.infer<typeof FormPageSchema>;
export const FormPageSchema = z.object({ meta: FormPageMetaSchema, id: z.number().int(), title: z.string(), from_address: z.string().max(255).nullable().optional(), to_address: z.string().max(255).nullable().optional(), subject: z.string().max(255).nullable().optional(), form_fields: z.array(FormFieldSchema).default([]), image: ImageForeignKeySchema.nullable().optional(), body: z.array(z.unknown()).default([]), thank_you_text: z.string().nullable().optional(), image_hero: z.unknown().optional() });

export type GalleryPageMetaSchema = z.infer<typeof GalleryPageMetaSchema>;
export const GalleryPageMetaSchema = z.object({ type: z.literal("base.GalleryPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type GalleryPageSchema = z.infer<typeof GalleryPageSchema>;
export const GalleryPageSchema = z.object({ meta: GalleryPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), image: ImageForeignKeySchema.nullable().optional(), body: z.array(z.unknown()).default([]), collection: CollectionForeignKeySchema.nullable().optional(), image_hero: z.unknown().optional() });

export type HomePageMetaSchema = z.infer<typeof HomePageMetaSchema>;
export const HomePageMetaSchema = z.object({ type: z.literal("base.HomePage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type abc__PageMetaSchema__2 = z.infer<typeof abc__PageMetaSchema__2>;
export const abc__PageMetaSchema__2 = z.object({ type: z.literal("wagtailcore.Page"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type PageForeignKeySchema = z.infer<typeof PageForeignKeySchema>;
export const PageForeignKeySchema = z.object({ meta: abc__PageMetaSchema__2, id: z.number().int().nullable().optional() });

export type HomePageSchema = z.infer<typeof HomePageSchema>;
export const HomePageSchema = z.object({ meta: HomePageMetaSchema, id: z.number().int(), title: z.string(), hero_text: z.string().max(255), hero_cta: z.string().max(255), lead_title: z.string().max(255).nullable().optional(), featured_section_1_title: z.string().max(255).nullable().optional(), featured_section_2_title: z.string().max(255).nullable().optional(), featured_section_3_title: z.string().max(255).nullable().optional(), image: ImageForeignKeySchema.nullable().optional(), hero_cta_link: PageForeignKeySchema.nullable().optional(), body: z.array(z.unknown()).default([]), lead_image: ImageForeignKeySchema.nullable().optional(), lead_text: z.string().nullable().optional(), featured_section_1: PageForeignKeySchema.nullable().optional(), featured_section_2: PageForeignKeySchema.nullable().optional(), featured_section_3: PageForeignKeySchema.nullable().optional(), image_hero: z.unknown().optional(), lead_image_promo: z.unknown().optional() });

export type LocationOperatingHoursMetaSchema = z.infer<typeof LocationOperatingHoursMetaSchema>;
export const LocationOperatingHoursMetaSchema = z.object({ type: z.literal("locations.LocationOperatingHours"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type LocationOperatingHoursSchema = z.infer<typeof LocationOperatingHoursSchema>;
export const LocationOperatingHoursSchema = z.object({ meta: LocationOperatingHoursMetaSchema, id: z.number().int().nullable().optional(), day: z.string().max(3).default("MON"), opening_time: z.iso.time().nullable().optional(), closing_time: z.iso.time().nullable().optional(), closed: z.boolean().nullable().optional(), get_day_display: z.unknown().optional() });

export type LocationPageMetaSchema = z.infer<typeof LocationPageMetaSchema>;
export const LocationPageMetaSchema = z.object({ type: z.literal("locations.LocationPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type LocationPageSchema = z.infer<typeof LocationPageSchema>;
export const LocationPageSchema = z.object({ meta: LocationPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), address: z.string(), lat_long: z.string().max(36), image: ImageForeignKeySchema.nullable().optional(), body: z.array(z.unknown()).default([]), is_open: z.unknown().optional(), hours_of_operation: z.array(LocationOperatingHoursSchema).default([]), image_hero: z.unknown().optional(), image_location_card: z.unknown().optional(), image_picture_card: z.unknown().optional() });

export type LocationsIndexPageMetaSchema = z.infer<typeof LocationsIndexPageMetaSchema>;
export const LocationsIndexPageMetaSchema = z.object({ type: z.literal("locations.LocationsIndexPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type LocationsIndexPageSchema = z.infer<typeof LocationsIndexPageSchema>;
export const LocationsIndexPageSchema = z.object({ meta: LocationsIndexPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), image: ImageForeignKeySchema.nullable().optional() });

export type abc__PageMetaSchema__1 = z.infer<typeof abc__PageMetaSchema__1>;
export const abc__PageMetaSchema__1 = z.object({ type: z.literal("wagtailcore.Page"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type PageSchema = z.infer<typeof PageSchema>;
export const PageSchema = z.object({ meta: abc__PageMetaSchema__1, id: z.number().int().nullable().optional(), title: z.string() });

export type PeopleIndexPageMetaSchema = z.infer<typeof PeopleIndexPageMetaSchema>;
export const PeopleIndexPageMetaSchema = z.object({ type: z.literal("people.PeopleIndexPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type PeopleIndexPageSchema = z.infer<typeof PeopleIndexPageSchema>;
export const PeopleIndexPageSchema = z.object({ meta: PeopleIndexPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), image: ImageForeignKeySchema.nullable().optional() });

export type PersonPageMetaSchema = z.infer<typeof PersonPageMetaSchema>;
export const PersonPageMetaSchema = z.object({ type: z.literal("people.PersonPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type PersonPageSchema = z.infer<typeof PersonPageSchema>;
export const PersonPageSchema = z.object({ meta: PersonPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), image: ImageForeignKeySchema.nullable().optional(), body: z.array(z.unknown()).default([]), location: CountryForeignKeySchema.nullable().optional(), social_links: z.array(z.unknown()).default([]), image_hero: z.unknown().optional(), image_listing: z.unknown().optional() });

export type RecipeIndexPageMetaSchema = z.infer<typeof RecipeIndexPageMetaSchema>;
export const RecipeIndexPageMetaSchema = z.object({ type: z.literal("recipes.RecipeIndexPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type RecipeIndexPageSchema = z.infer<typeof RecipeIndexPageSchema>;
export const RecipeIndexPageSchema = z.object({ meta: RecipeIndexPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional() });

export type abc__RecipePageMetaSchema__2 = z.infer<typeof abc__RecipePageMetaSchema__2>;
export const abc__RecipePageMetaSchema__2 = z.object({ type: z.literal("recipes.RecipePage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type RecipePageForeignKeySchema = z.infer<typeof RecipePageForeignKeySchema>;
export const RecipePageForeignKeySchema = z.object({ meta: abc__RecipePageMetaSchema__2, id: z.number().int().nullable().optional() });

export type abc__RecipePageMetaSchema__1 = z.infer<typeof abc__RecipePageMetaSchema__1>;
export const abc__RecipePageMetaSchema__1 = z.object({ type: z.literal("recipes.RecipePage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type RecipePersonRelationshipMetaSchema = z.infer<typeof RecipePersonRelationshipMetaSchema>;
export const RecipePersonRelationshipMetaSchema = z.object({ type: z.literal("recipes.RecipePersonRelationship"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type RecipePersonRelationshipSchema = z.infer<typeof RecipePersonRelationshipSchema>;
export const RecipePersonRelationshipSchema = z.object({ meta: RecipePersonRelationshipMetaSchema, id: z.number().int().nullable().optional(), page: RecipePageForeignKeySchema.optional(), person: PersonForeignKeySchema.optional() });

export type RecipePageSchema = z.infer<typeof RecipePageSchema>;
export const RecipePageSchema = z.object({ meta: abc__RecipePageMetaSchema__1, id: z.number().int(), title: z.string(), date_published: z.iso.date().nullable().optional(), subtitle: z.string().max(255).nullable().optional(), introduction: z.string().max(500).nullable().optional(), backstory: z.array(z.unknown()).default([]), recipe_headline: z.string().nullable().optional(), body: z.array(z.unknown()).default([]), recipe_person_relationship: z.array(RecipePersonRelationshipSchema).default([]) });

export type StandardPageMetaSchema = z.infer<typeof StandardPageMetaSchema>;
export const StandardPageMetaSchema = z.object({ type: z.literal("base.StandardPage"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), html_url: z.string().nullable().optional(), locale: z.string().nullable().optional(), slug: z.string(), first_published_at: z.iso.datetime().nullable().optional(), show_in_menus: z.boolean().nullable().optional(), seo_title: z.string().nullable().optional(), search_description: z.string().nullable().optional(), alias_of: SimpleBasePageSchema.nullable().optional(), parent: SimpleBasePageSchema.nullable().optional() });

export type StandardPageSchema = z.infer<typeof StandardPageSchema>;
export const StandardPageSchema = z.object({ meta: StandardPageMetaSchema, id: z.number().int(), title: z.string(), introduction: z.string().nullable().optional(), image: ImageForeignKeySchema.nullable().optional(), body: z.array(z.unknown()).default([]), image_hero: z.unknown().optional() });

export type BlogIndexPageCreateMetaSchema = z.infer<typeof BlogIndexPageCreateMetaSchema>;
export const BlogIndexPageCreateMetaSchema = z.object({ type: z.literal("blog.BlogIndexPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type BlogIndexPageCreateSchema = z.infer<typeof BlogIndexPageCreateSchema>;
export const BlogIndexPageCreateSchema = z.object({ meta: BlogIndexPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false), introduction: z.string().nullable().optional(), image_id: z.number().int().nullable().optional() });

export type BlogPageCreateMetaSchema = z.infer<typeof BlogPageCreateMetaSchema>;
export const BlogPageCreateMetaSchema = z.object({ type: z.literal("blog.BlogPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type BlogPersonRelationshipCreateSchema = z.infer<typeof BlogPersonRelationshipCreateSchema>;
export const BlogPersonRelationshipCreateSchema = z.object({ page_id: z.number().int(), person_id: z.number().int() });

export type BlogPageCreateSchema = z.infer<typeof BlogPageCreateSchema>;
export const BlogPageCreateSchema = z.object({ meta: BlogPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false), introduction: z.string().nullable().optional(), image_id: z.number().int().nullable().optional(), body: z.array(z.unknown()).default([]), subtitle: z.string().max(255).nullable().optional(), date_published: z.iso.date().nullable().optional(), blog_person_relationship: z.array(BlogPersonRelationshipCreateSchema).default([]) });

export type BreadPageCreateMetaSchema = z.infer<typeof BreadPageCreateMetaSchema>;
export const BreadPageCreateMetaSchema = z.object({ type: z.literal("breads.BreadPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type BreadPageCreateSchema = z.infer<typeof BreadPageCreateSchema>;
export const BreadPageCreateSchema = z.object({ meta: BreadPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type BreadsIndexPageCreateMetaSchema = z.infer<typeof BreadsIndexPageCreateMetaSchema>;
export const BreadsIndexPageCreateMetaSchema = z.object({ type: z.literal("breads.BreadsIndexPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type BreadsIndexPageCreateSchema = z.infer<typeof BreadsIndexPageCreateSchema>;
export const BreadsIndexPageCreateSchema = z.object({ meta: BreadsIndexPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type FormPageCreateMetaSchema = z.infer<typeof FormPageCreateMetaSchema>;
export const FormPageCreateMetaSchema = z.object({ type: z.literal("base.FormPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type FormPageCreateSchema = z.infer<typeof FormPageCreateSchema>;
export const FormPageCreateSchema = z.object({ meta: FormPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type GalleryPageCreateMetaSchema = z.infer<typeof GalleryPageCreateMetaSchema>;
export const GalleryPageCreateMetaSchema = z.object({ type: z.literal("base.GalleryPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type GalleryPageCreateSchema = z.infer<typeof GalleryPageCreateSchema>;
export const GalleryPageCreateSchema = z.object({ meta: GalleryPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type HomePageCreateMetaSchema = z.infer<typeof HomePageCreateMetaSchema>;
export const HomePageCreateMetaSchema = z.object({ type: z.literal("base.HomePage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type HomePageCreateSchema = z.infer<typeof HomePageCreateSchema>;
export const HomePageCreateSchema = z.object({ meta: HomePageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type LocationPageCreateMetaSchema = z.infer<typeof LocationPageCreateMetaSchema>;
export const LocationPageCreateMetaSchema = z.object({ type: z.literal("locations.LocationPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type LocationPageCreateSchema = z.infer<typeof LocationPageCreateSchema>;
export const LocationPageCreateSchema = z.object({ meta: LocationPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type LocationsIndexPageCreateMetaSchema = z.infer<typeof LocationsIndexPageCreateMetaSchema>;
export const LocationsIndexPageCreateMetaSchema = z.object({ type: z.literal("locations.LocationsIndexPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type LocationsIndexPageCreateSchema = z.infer<typeof LocationsIndexPageCreateSchema>;
export const LocationsIndexPageCreateSchema = z.object({ meta: LocationsIndexPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type PeopleIndexPageCreateMetaSchema = z.infer<typeof PeopleIndexPageCreateMetaSchema>;
export const PeopleIndexPageCreateMetaSchema = z.object({ type: z.literal("people.PeopleIndexPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type PeopleIndexPageCreateSchema = z.infer<typeof PeopleIndexPageCreateSchema>;
export const PeopleIndexPageCreateSchema = z.object({ meta: PeopleIndexPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type PersonPageCreateMetaSchema = z.infer<typeof PersonPageCreateMetaSchema>;
export const PersonPageCreateMetaSchema = z.object({ type: z.literal("people.PersonPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type PersonPageCreateSchema = z.infer<typeof PersonPageCreateSchema>;
export const PersonPageCreateSchema = z.object({ meta: PersonPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type RecipeIndexPageCreateMetaSchema = z.infer<typeof RecipeIndexPageCreateMetaSchema>;
export const RecipeIndexPageCreateMetaSchema = z.object({ type: z.literal("recipes.RecipeIndexPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type RecipeIndexPageCreateSchema = z.infer<typeof RecipeIndexPageCreateSchema>;
export const RecipeIndexPageCreateSchema = z.object({ meta: RecipeIndexPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type RecipePageCreateMetaSchema = z.infer<typeof RecipePageCreateMetaSchema>;
export const RecipePageCreateMetaSchema = z.object({ type: z.literal("recipes.RecipePage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type RecipePageCreateSchema = z.infer<typeof RecipePageCreateSchema>;
export const RecipePageCreateSchema = z.object({ meta: RecipePageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type StandardPageCreateMetaSchema = z.infer<typeof StandardPageCreateMetaSchema>;
export const StandardPageCreateMetaSchema = z.object({ type: z.literal("base.StandardPage"), parent_id: z.number().int(), action: z.literal("publish").nullable().optional() });

export type StandardPageCreateSchema = z.infer<typeof StandardPageCreateSchema>;
export const StandardPageCreateSchema = z.object({ meta: StandardPageCreateMetaSchema, title: z.string().max(255), slug: z.string().max(255).nullable().optional(), seo_title: z.string().max(255).nullable().optional(), search_description: z.string().nullable().optional(), show_in_menus: z.boolean().nullable().default(false) });

export type BlogIndexPagePatchMetaSchema = z.infer<typeof BlogIndexPagePatchMetaSchema>;
export const BlogIndexPagePatchMetaSchema = z.object({ type: z.literal("blog.BlogIndexPage").nullable(), action: z.literal("publish").nullable().optional() });

export type BlogIndexPagePatchSchema = z.infer<typeof BlogIndexPagePatchSchema>;
export const BlogIndexPagePatchSchema = z.object({ meta: BlogIndexPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false), introduction: z.string().nullable(), image_id: z.number().int().nullable() }).partial();

export type BlogPagePatchMetaSchema = z.infer<typeof BlogPagePatchMetaSchema>;
export const BlogPagePatchMetaSchema = z.object({ type: z.literal("blog.BlogPage").nullable(), action: z.literal("publish").nullable().optional() });

export type BlogPersonRelationshipPatchSchema = z.infer<typeof BlogPersonRelationshipPatchSchema>;
export const BlogPersonRelationshipPatchSchema = z.object({ id: z.number().int().nullable(), page_id: z.number().int().nullable(), person_id: z.number().int().nullable() }).partial();

export type BlogPagePatchSchema = z.infer<typeof BlogPagePatchSchema>;
export const BlogPagePatchSchema = z.object({ meta: BlogPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false), introduction: z.string().nullable(), image_id: z.number().int().nullable(), body: z.array(z.unknown()).default([]), subtitle: z.string().max(255).nullable(), date_published: z.iso.date().nullable(), blog_person_relationship: z.array(BlogPersonRelationshipPatchSchema).default([]) }).partial();

export type BreadPagePatchMetaSchema = z.infer<typeof BreadPagePatchMetaSchema>;
export const BreadPagePatchMetaSchema = z.object({ type: z.literal("breads.BreadPage").nullable(), action: z.literal("publish").nullable().optional() });

export type BreadPagePatchSchema = z.infer<typeof BreadPagePatchSchema>;
export const BreadPagePatchSchema = z.object({ meta: BreadPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type BreadsIndexPagePatchMetaSchema = z.infer<typeof BreadsIndexPagePatchMetaSchema>;
export const BreadsIndexPagePatchMetaSchema = z.object({ type: z.literal("breads.BreadsIndexPage").nullable(), action: z.literal("publish").nullable().optional() });

export type BreadsIndexPagePatchSchema = z.infer<typeof BreadsIndexPagePatchSchema>;
export const BreadsIndexPagePatchSchema = z.object({ meta: BreadsIndexPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type FormPagePatchMetaSchema = z.infer<typeof FormPagePatchMetaSchema>;
export const FormPagePatchMetaSchema = z.object({ type: z.literal("base.FormPage").nullable(), action: z.literal("publish").nullable().optional() });

export type FormPagePatchSchema = z.infer<typeof FormPagePatchSchema>;
export const FormPagePatchSchema = z.object({ meta: FormPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type GalleryPagePatchMetaSchema = z.infer<typeof GalleryPagePatchMetaSchema>;
export const GalleryPagePatchMetaSchema = z.object({ type: z.literal("base.GalleryPage").nullable(), action: z.literal("publish").nullable().optional() });

export type GalleryPagePatchSchema = z.infer<typeof GalleryPagePatchSchema>;
export const GalleryPagePatchSchema = z.object({ meta: GalleryPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type HomePagePatchMetaSchema = z.infer<typeof HomePagePatchMetaSchema>;
export const HomePagePatchMetaSchema = z.object({ type: z.literal("base.HomePage").nullable(), action: z.literal("publish").nullable().optional() });

export type HomePagePatchSchema = z.infer<typeof HomePagePatchSchema>;
export const HomePagePatchSchema = z.object({ meta: HomePagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type LocationPagePatchMetaSchema = z.infer<typeof LocationPagePatchMetaSchema>;
export const LocationPagePatchMetaSchema = z.object({ type: z.literal("locations.LocationPage").nullable(), action: z.literal("publish").nullable().optional() });

export type LocationPagePatchSchema = z.infer<typeof LocationPagePatchSchema>;
export const LocationPagePatchSchema = z.object({ meta: LocationPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type LocationsIndexPagePatchMetaSchema = z.infer<typeof LocationsIndexPagePatchMetaSchema>;
export const LocationsIndexPagePatchMetaSchema = z.object({ type: z.literal("locations.LocationsIndexPage").nullable(), action: z.literal("publish").nullable().optional() });

export type LocationsIndexPagePatchSchema = z.infer<typeof LocationsIndexPagePatchSchema>;
export const LocationsIndexPagePatchSchema = z.object({ meta: LocationsIndexPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type PeopleIndexPagePatchMetaSchema = z.infer<typeof PeopleIndexPagePatchMetaSchema>;
export const PeopleIndexPagePatchMetaSchema = z.object({ type: z.literal("people.PeopleIndexPage").nullable(), action: z.literal("publish").nullable().optional() });

export type PeopleIndexPagePatchSchema = z.infer<typeof PeopleIndexPagePatchSchema>;
export const PeopleIndexPagePatchSchema = z.object({ meta: PeopleIndexPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type PersonPagePatchMetaSchema = z.infer<typeof PersonPagePatchMetaSchema>;
export const PersonPagePatchMetaSchema = z.object({ type: z.literal("people.PersonPage").nullable(), action: z.literal("publish").nullable().optional() });

export type PersonPagePatchSchema = z.infer<typeof PersonPagePatchSchema>;
export const PersonPagePatchSchema = z.object({ meta: PersonPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type RecipeIndexPagePatchMetaSchema = z.infer<typeof RecipeIndexPagePatchMetaSchema>;
export const RecipeIndexPagePatchMetaSchema = z.object({ type: z.literal("recipes.RecipeIndexPage").nullable(), action: z.literal("publish").nullable().optional() });

export type RecipeIndexPagePatchSchema = z.infer<typeof RecipeIndexPagePatchSchema>;
export const RecipeIndexPagePatchSchema = z.object({ meta: RecipeIndexPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type RecipePagePatchMetaSchema = z.infer<typeof RecipePagePatchMetaSchema>;
export const RecipePagePatchMetaSchema = z.object({ type: z.literal("recipes.RecipePage").nullable(), action: z.literal("publish").nullable().optional() });

export type RecipePagePatchSchema = z.infer<typeof RecipePagePatchSchema>;
export const RecipePagePatchSchema = z.object({ meta: RecipePagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type StandardPagePatchMetaSchema = z.infer<typeof StandardPagePatchMetaSchema>;
export const StandardPagePatchMetaSchema = z.object({ type: z.literal("base.StandardPage").nullable(), action: z.literal("publish").nullable().optional() });

export type StandardPagePatchSchema = z.infer<typeof StandardPagePatchSchema>;
export const StandardPagePatchSchema = z.object({ meta: StandardPagePatchMetaSchema.nullable(), title: z.string().max(255).nullable(), slug: z.string().max(255).nullable(), seo_title: z.string().max(255).nullable(), search_description: z.string().nullable(), show_in_menus: z.boolean().nullable().default(false) }).partial();

export type BaseMetaSchema = z.infer<typeof BaseMetaSchema>;
export const BaseMetaSchema = z.object({ type: z.string(), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional() });

export type RevisionSchema = z.infer<typeof RevisionSchema>;
export const RevisionSchema = z.object({ meta: BaseMetaSchema, id: z.number().int().gt(0), object_id: z.string(), created_at: z.iso.datetime(), user_id: z.union([z.number().int(), z.string(), z.uuid(), z.null()]).optional(), object_str: z.string(), approved_go_live_at: z.iso.datetime().nullable().optional() });

export type PagedRevisionSchema = z.infer<typeof PagedRevisionSchema>;
export const PagedRevisionSchema = z.object({ items: z.array(RevisionSchema), count: z.number().int() });

export type ContentTypeSchema = z.infer<typeof ContentTypeSchema>;
export const ContentTypeSchema = z.object({ meta: BaseMetaSchema, id: z.number().int(), name: z.string(), label: z.string() });

export type PageRevisionDetailSchema = z.infer<typeof PageRevisionDetailSchema>;
export const PageRevisionDetailSchema = z.object({ meta: BaseMetaSchema, id: z.number().int().gt(0), object_id: z.string(), created_at: z.iso.datetime(), user_id: z.union([z.number().int(), z.string(), z.uuid(), z.null()]).optional(), object_str: z.string(), approved_go_live_at: z.iso.datetime().nullable().optional(), content_type: ContentTypeSchema, base_content_type: ContentTypeSchema, content_object: z.union([PageSchema, StandardPageSchema, HomePageSchema, GalleryPageSchema, FormPageSchema, BlogPageSchema, BlogIndexPageSchema, BreadPageSchema, BreadsIndexPageSchema, LocationsIndexPageSchema, LocationPageSchema, RecipePageSchema, RecipeIndexPageSchema, PersonPageSchema, PeopleIndexPageSchema]) });

export type PageUnpublishSchema = z.infer<typeof PageUnpublishSchema>;
export const PageUnpublishSchema = z.object({ recursive: z.boolean().default(false) }).partial();

export type PageCopySchema = z.infer<typeof PageCopySchema>;
export const PageCopySchema = z.object({ destination_id: z.number().int().gt(0).nullable(), recursive: z.boolean().default(false), keep_live: z.boolean().default(true), slug: z.string().nullable(), title: z.string().nullable() }).partial();

export type PageMoveSchema = z.infer<typeof PageMoveSchema>;
export const PageMoveSchema = z.object({ destination_id: z.number().int().gt(0), position: z.enum(["first-child", "last-child", "left", "right", "first-sibling", "last-sibling"]).nullable().optional() });

export type PageRevertSchema = z.infer<typeof PageRevertSchema>;
export const PageRevertSchema = z.object({ revision_id: z.number().int().gt(0) });

export type PageCreateAliasSchema = z.infer<typeof PageCreateAliasSchema>;
export const PageCreateAliasSchema = z.object({ destination_id: z.number().int().gt(0).nullable(), recursive: z.boolean().default(false), slug: z.string().nullable() }).partial();

export type PageCopyForTranslationSchema = z.infer<typeof PageCopyForTranslationSchema>;
export const PageCopyForTranslationSchema = z.object({ locale: z.string(), copy_parents: z.boolean().default(false), alias: z.boolean().default(false), recursive: z.boolean().default(false) });

export type ContentTypeSummarySchema = z.infer<typeof ContentTypeSummarySchema>;
export const ContentTypeSummarySchema = z.object({ name: z.string(), label: z.string() });

export type ContentTypeListSchema = z.infer<typeof ContentTypeListSchema>;
export const ContentTypeListSchema = z.object({ types: z.array(ContentTypeSummarySchema) });

export type SchemaDetailResponse = z.infer<typeof SchemaDetailResponse>;
export const SchemaDetailResponse = z.object({ read: z.record(z.string(), z.unknown()).nullable(), create: z.record(z.string(), z.unknown()).nullable(), patch: z.record(z.string(), z.unknown()).nullable() }).partial();

export type SiteSchema = z.infer<typeof SiteSchema>;
export const SiteSchema = z.object({ id: z.number().int(), hostname: z.string(), port: z.number().int(), site_name: z.string(), root_page_id: z.number().int(), is_default_site: z.boolean() });

export type PagedSiteSchema = z.infer<typeof PagedSiteSchema>;
export const PagedSiteSchema = z.object({ items: z.array(SiteSchema), count: z.number().int() });

export type SiteInputSchema = z.infer<typeof SiteInputSchema>;
export const SiteInputSchema = z.object({ hostname: z.string(), port: z.number().int().default(80), site_name: z.string().default(""), root_page_id: z.number().int(), is_default_site: z.boolean().default(false) });

export type WhoAmIProfileSchema = z.infer<typeof WhoAmIProfileSchema>;
export const WhoAmIProfileSchema = z.object({ avatar_url: z.string().nullable() });

export type WhoAmIUserSchema = z.infer<typeof WhoAmIUserSchema>;
export const WhoAmIUserSchema = z.object({ id: z.string(), username: z.string(), email: z.string(), first_name: z.string(), last_name: z.string(), is_superuser: z.boolean() });

export type WhoAmISchema = z.infer<typeof WhoAmISchema>;
export const WhoAmISchema = z.object({ user: WhoAmIUserSchema, profile: WhoAmIProfileSchema, groups: z.array(z.string()) });

export type BreadIngredientMetaSchema = z.infer<typeof BreadIngredientMetaSchema>;
export const BreadIngredientMetaSchema = z.object({ type: z.literal("breads.BreadIngredient"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional() });

export type BreadIngredientSchema = z.infer<typeof BreadIngredientSchema>;
export const BreadIngredientSchema = z.object({ meta: BreadIngredientMetaSchema, id: z.number().int().nullable().optional(), name: z.string().max(255) });

export type BreadTypeSchema = z.infer<typeof BreadTypeSchema>;
export const BreadTypeSchema = z.object({ meta: BreadTypeMetaSchema, id: z.number().int().nullable().optional(), title: z.string().max(255) });

export type FooterTextMetaSchema = z.infer<typeof FooterTextMetaSchema>;
export const FooterTextMetaSchema = z.object({ type: z.literal("base.FooterText"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional() });

export type FooterTextSchema = z.infer<typeof FooterTextSchema>;
export const FooterTextSchema = z.object({ meta: FooterTextMetaSchema, id: z.number().int().nullable().optional(), body: z.string().nullable().optional() });

export type PersonSchema = z.infer<typeof PersonSchema>;
export const PersonSchema = z.object({ meta: PersonMetaSchema, id: z.number().int().nullable().optional(), first_name: z.string().max(254), last_name: z.string().max(254), job_title: z.string().max(254), image: ImageForeignKeySchema.nullable().optional(), image_avatar: z.unknown().optional(), image_listing: z.unknown().optional() });

export type PagedAnnotated = z.infer<typeof PagedAnnotated>;
export const PagedAnnotated = z.object({ items: z.array(z.union([BreadIngredientSchema, BreadTypeSchema, FooterTextSchema, PersonSchema])), count: z.number().int() });

export type BreadIngredientCreateMetaSchema = z.infer<typeof BreadIngredientCreateMetaSchema>;
export const BreadIngredientCreateMetaSchema = z.object({ type: z.literal("breads.BreadIngredient").nullable(), action: z.literal("publish").nullable().optional() });

export type BreadIngredientCreateSchema = z.infer<typeof BreadIngredientCreateSchema>;
export const BreadIngredientCreateSchema = z.object({ meta: BreadIngredientCreateMetaSchema.nullable() }).partial();

export type BreadTypeCreateMetaSchema = z.infer<typeof BreadTypeCreateMetaSchema>;
export const BreadTypeCreateMetaSchema = z.object({ type: z.literal("breads.BreadType").nullable() });

export type BreadTypeCreateSchema = z.infer<typeof BreadTypeCreateSchema>;
export const BreadTypeCreateSchema = z.object({ meta: BreadTypeCreateMetaSchema.nullable() }).partial();

export type FooterTextCreateMetaSchema = z.infer<typeof FooterTextCreateMetaSchema>;
export const FooterTextCreateMetaSchema = z.object({ type: z.literal("base.FooterText").nullable(), action: z.literal("publish").nullable().optional() });

export type FooterTextCreateSchema = z.infer<typeof FooterTextCreateSchema>;
export const FooterTextCreateSchema = z.object({ meta: FooterTextCreateMetaSchema.nullable() }).partial();

export type PersonCreateMetaSchema = z.infer<typeof PersonCreateMetaSchema>;
export const PersonCreateMetaSchema = z.object({ type: z.literal("base.Person").nullable(), action: z.literal("publish").nullable().optional() });

export type PersonCreateSchema = z.infer<typeof PersonCreateSchema>;
export const PersonCreateSchema = z.object({ meta: PersonCreateMetaSchema.nullable() }).partial();

export type BreadIngredientPatchMetaSchema = z.infer<typeof BreadIngredientPatchMetaSchema>;
export const BreadIngredientPatchMetaSchema = z.object({ type: z.literal("breads.BreadIngredient").nullable(), action: z.literal("publish").nullable().optional() });

export type BreadIngredientPatchSchema = z.infer<typeof BreadIngredientPatchSchema>;
export const BreadIngredientPatchSchema = z.object({ meta: BreadIngredientPatchMetaSchema.nullable() }).partial();

export type BreadTypePatchMetaSchema = z.infer<typeof BreadTypePatchMetaSchema>;
export const BreadTypePatchMetaSchema = z.object({ type: z.literal("breads.BreadType").nullable() });

export type BreadTypePatchSchema = z.infer<typeof BreadTypePatchSchema>;
export const BreadTypePatchSchema = z.object({ meta: BreadTypePatchMetaSchema.nullable() }).partial();

export type FooterTextPatchMetaSchema = z.infer<typeof FooterTextPatchMetaSchema>;
export const FooterTextPatchMetaSchema = z.object({ type: z.literal("base.FooterText").nullable(), action: z.literal("publish").nullable().optional() });

export type FooterTextPatchSchema = z.infer<typeof FooterTextPatchSchema>;
export const FooterTextPatchSchema = z.object({ meta: FooterTextPatchMetaSchema.nullable() }).partial();

export type PersonPatchMetaSchema = z.infer<typeof PersonPatchMetaSchema>;
export const PersonPatchMetaSchema = z.object({ type: z.literal("base.Person").nullable(), action: z.literal("publish").nullable().optional() });

export type PersonPatchSchema = z.infer<typeof PersonPatchSchema>;
export const PersonPatchSchema = z.object({ meta: PersonPatchMetaSchema.nullable() }).partial();

export type SnippetRevisionDetailSchema = z.infer<typeof SnippetRevisionDetailSchema>;
export const SnippetRevisionDetailSchema = z.object({ meta: BaseMetaSchema, id: z.number().int().gt(0), object_id: z.string(), created_at: z.iso.datetime(), user_id: z.union([z.number().int(), z.string(), z.uuid(), z.null()]).optional(), object_str: z.string(), approved_go_live_at: z.iso.datetime().nullable().optional(), content_type: ContentTypeSchema, base_content_type: ContentTypeSchema, content_object: z.union([BreadIngredientSchema, BreadTypeSchema, FooterTextSchema, PersonSchema]) });

export type SnippetRevertSchema = z.infer<typeof SnippetRevertSchema>;
export const SnippetRevertSchema = z.object({ revision_id: z.number().int().gt(0) });

export type SnippetCopyForTranslationSchema = z.infer<typeof SnippetCopyForTranslationSchema>;
export const SnippetCopyForTranslationSchema = z.object({ locale: z.string() });

export type DocumentDetailMetaSchema = z.infer<typeof DocumentDetailMetaSchema>;
export const DocumentDetailMetaSchema = z.object({ type: z.literal("wagtaildocs.Document"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), tags: z.array(z.string()).default([]), download_url: z.string().nullable().optional() });

export type DocumentSchema = z.infer<typeof DocumentSchema>;
export const DocumentSchema = z.object({ meta: DocumentDetailMetaSchema, id: z.number().int().nullable().optional(), title: z.string(), collection: CollectionForeignKeySchema });

export type PagedDocumentSchema = z.infer<typeof PagedDocumentSchema>;
export const PagedDocumentSchema = z.object({ items: z.array(DocumentSchema), count: z.number().int() });

export type DocumentPatchSchema = z.infer<typeof DocumentPatchSchema>;
export const DocumentPatchSchema = z.object({ title: z.string().max(255).nullable(), collection_id: z.number().int().nullable() }).partial();

export type ImageDetailMetaSchema = z.infer<typeof ImageDetailMetaSchema>;
export const ImageDetailMetaSchema = z.object({ type: z.literal("wagtailimages.Image"), warnings: z.array(z.union([RichTextRemoval, z.string()])).nullable().optional(), detail_url: z.string().nullable().optional(), tags: z.array(z.string()).default([]), download_url: z.string().nullable().optional() });

export type ImageSchema = z.infer<typeof ImageSchema>;
export const ImageSchema = z.object({ meta: ImageDetailMetaSchema, id: z.number().int().nullable().optional(), title: z.string(), width: z.number().int(), height: z.number().int(), description: z.string().nullable().optional(), collection: CollectionForeignKeySchema.optional(), focal_point_x: z.number().int().nullable().optional(), focal_point_y: z.number().int().nullable().optional(), focal_point_width: z.number().int().nullable().optional(), focal_point_height: z.number().int().nullable().optional() });

export type PagedImageSchema = z.infer<typeof PagedImageSchema>;
export const PagedImageSchema = z.object({ items: z.array(ImageSchema), count: z.number().int() });

export type ImagePatchSchema = z.infer<typeof ImagePatchSchema>;
export const ImagePatchSchema = z.object({ title: z.string().max(255).nullable(), description: z.string().max(255).nullable().default(""), collection_id: z.number().int().nullable(), focal_point_x: z.number().int().nullable(), focal_point_y: z.number().int().nullable(), focal_point_width: z.number().int().nullable(), focal_point_height: z.number().int().nullable() }).partial();

export type LocaleSchema = z.infer<typeof LocaleSchema>;
export const LocaleSchema = z.object({ meta: BaseMetaSchema, id: z.number().int().gt(0), language_code: z.string(), display_name: z.string(), is_bidi: z.boolean(), is_default: z.boolean() });

export type PagedLocaleSchema = z.infer<typeof PagedLocaleSchema>;
export const PagedLocaleSchema = z.object({ items: z.array(LocaleSchema), count: z.number().int() });

export type LocaleInputSchema = z.infer<typeof LocaleInputSchema>;
export const LocaleInputSchema = z.object({ language_code: z.string() });

export type RedirectSchema = z.infer<typeof RedirectSchema>;
export const RedirectSchema = z.object({ id: z.number().int(), old_path: z.string(), site_id: z.number().int().nullable(), is_permanent: z.boolean(), redirect_page_id: z.number().int().nullable(), redirect_page_route_path: z.string(), redirect_link: z.string(), automatically_created: z.boolean(), created_at: z.iso.datetime().nullable() });

export type PagedRedirectSchema = z.infer<typeof PagedRedirectSchema>;
export const PagedRedirectSchema = z.object({ items: z.array(RedirectSchema), count: z.number().int() });

export type RedirectInputSchema = z.infer<typeof RedirectInputSchema>;
export const RedirectInputSchema = z.object({ old_path: z.string(), site: z.number().int().nullable().optional(), is_permanent: z.boolean().default(true), redirect_page_id: z.number().int().nullable().optional(), redirect_page_route_path: z.string().default(""), redirect_link: z.string().default("") });

// </Schemas>

  
  
  