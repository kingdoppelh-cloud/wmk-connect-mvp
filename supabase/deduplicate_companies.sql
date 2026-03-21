-- Löscht alle Duplikate in der "companies" Tabelle basierend auf dem Namen
-- Behält immer den neusten Eintrag (mit der aktuellsten created_at).

DELETE FROM public.companies
WHERE id NOT IN (
    SELECT id
    FROM (
        SELECT DISTINCT ON (name) id
        FROM public.companies
        ORDER BY name, created_at DESC
    ) t
);
