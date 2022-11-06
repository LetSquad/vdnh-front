import { useCallback, useMemo } from "react";

import { Form, FormikProvider, useFormik } from "formik";

import ExtendedTags from "@components/Places/ExtendedTags";
import { ExtendedTags as ExtendedTagsEnum } from "@models/places/enums";
import { PlaceFilterFormValues } from "@models/places/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch } from "@store/hooks";
import { setActiveTags } from "@store/mapPoints/reducer";

export default function PlaceFilter() {
    const dispatch = useAppDispatch();

    const initialValues: PlaceFilterFormValues = useMemo(() => ({
        tags: Object.values(ExtendedTagsEnum)
    }), []);

    const filterRoutes = useCallback((values: PlaceFilterFormValues) => {
        dispatch(setActiveTags(values.tags));
    }, [dispatch]);

    const formik = useFormik<PlaceFilterFormValues>({
        onSubmit: filterRoutes,
        initialValues,
        validateOnBlur: false
    });

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <ExtendedTags />
                <PrimaryButton
                    type="submit"
                    fluid
                >
                    Применить
                </PrimaryButton>
            </Form>
        </FormikProvider>
    );
}
