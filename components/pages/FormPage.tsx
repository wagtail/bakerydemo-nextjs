import type { base } from '@/models';
import type { PageComponentProps } from './types';

export default async function FormPage({
  page,
}: PageComponentProps<base.FormPage>) {
  return (
    <>
      <section>
        <h1>{page.title}</h1>
        {page.body.map(({ id, value }) => (
          <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
      </section>

      <section>
        <form action={`/${page.meta.slug}`} method="POST">
          {page.form_fields.map((field) => (
            <div key={field.id}>
              <label htmlFor={`id_${field.id}`}>
                {field.label}
                {field.required && <span aria-hidden="true">*</span>}
              </label>

              {field.help_text && (
                <p id={`help_${field.id}`}>{field.help_text}</p>
              )}

              {field.field_type === 'select' ? (
                <select
                  id={`id_${field.id}`}
                  name={`field_${field.id}`}
                  required={field.required}
                  aria-describedby={
                    field.help_text ? `help_${field.id}` : undefined
                  }
                  defaultValue={field.default_value ?? ''}
                >
                  {field.choices?.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              ) : field.field_type === 'textarea' ? (
                <textarea
                  id={`id_${field.id}`}
                  name={`field_${field.id}`}
                  required={field.required}
                  aria-describedby={
                    field.help_text ? `help_${field.id}` : undefined
                  }
                  defaultValue={field.default_value ?? ''}
                />
              ) : (
                <input
                  id={`id_${field.id}`}
                  type={field.field_type}
                  name={`field_${field.id}`}
                  required={field.required}
                  aria-describedby={
                    field.help_text ? `help_${field.id}` : undefined
                  }
                  defaultValue={field.default_value ?? ''}
                />
              )}
            </div>
          ))}

          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
