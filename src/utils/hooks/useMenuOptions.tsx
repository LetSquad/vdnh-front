import { useCallback } from "react";

import classNames from "classnames";
import { Link } from "react-router-dom";

import { useLocationActive } from "@hooks/useLocationActive";
import { UserRole } from "@models/users/enums";
import { DoctorPagesData } from "@pages/DoctorPages/DoctorPagesData";
import { UserPagesData } from "@pages/UserPages/UserPagesData";
import { useAppSelector } from "@store/hooks";
import { selectUserRole } from "@store/info/selectors";

const Items = [{
    name: UserPagesData.DASHBOARD.name,
    url: UserPagesData.DASHBOARD.slug
}, {
    name: UserPagesData.MY_PETS.name,
    url: UserPagesData.MY_PETS.slug
}, {
    name: UserPagesData.RECEPTIONS.name,
    url: UserPagesData.RECEPTIONS.slug
}, {
    name: UserPagesData.NEW_APPOINTMENT.name,
    url: UserPagesData.NEW_APPOINTMENT.slug
}];

const DoctorItems = [{
    name: DoctorPagesData.DASHBOARD.name,
    url: DoctorPagesData.DASHBOARD.slug
}, {
    name: DoctorPagesData.APPOINTMENTS.name,
    url: DoctorPagesData.APPOINTMENTS.slug
}, {
    name: DoctorPagesData.CREATE_APPOINTMENT.name,
    url: DoctorPagesData.CREATE_APPOINTMENT.slug
}];

export function useMenuOptions(onClose?: () => void) {
    const role = useAppSelector(selectUserRole);

    const isLocationActive = useLocationActive();

    const getOptions = useCallback(
        (menuOptions: { name: string; url: string }[]) => menuOptions.map((option) => (
            <Link
                to={option.url}
                key={option.url}
                className={classNames("item", { active: isLocationActive(option.url) })}
                onClick={() => {
                    if (onClose) {
                        onClose();
                    }
                }}
            >
                {option.name}
            </Link>
        )),
        [isLocationActive, onClose]
    );

    switch (role) {
        case UserRole.VETCLINIC:
        case UserRole.ADMIN: {
            return undefined;
        }
        case UserRole.DOCTOR: {
            return getOptions(DoctorItems);
        }
        default: {
            return getOptions(Items);
        }
    }
}
