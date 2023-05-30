import React from 'react';
import {InertiaLink} from '@inertiajs/inertia-react';
import CreateCountry from './CreateCountry';
import Countries from "@/Components/Countries";

const CountryLayout = ({props}) => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
                <CreateCountry/>
            </div>
            <div className="w-full lg:w-3/4">
                <Countries/>
            </div>
        </div>
    )
}

export default CountryLayout;
