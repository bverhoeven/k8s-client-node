/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1.30.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V1NodeSelector } from '../models/V1NodeSelector.js';
import { V1alpha2ResourceHandle } from '../models/V1alpha2ResourceHandle.js';
import { HttpFile } from '../http/http.js';

/**
* AllocationResult contains attributes of an allocated resource.
*/
export class V1alpha2AllocationResult {
    'availableOnNodes'?: V1NodeSelector;
    /**
    * ResourceHandles contain the state associated with an allocation that should be maintained throughout the lifetime of a claim. Each ResourceHandle contains data that should be passed to a specific kubelet plugin once it lands on a node. This data is returned by the driver after a successful allocation and is opaque to Kubernetes. Driver documentation may explain to users how to interpret this data if needed.  Setting this field is optional. It has a maximum size of 32 entries. If null (or empty), it is assumed this allocation will be processed by a single kubelet plugin with no ResourceHandle data attached. The name of the kubelet plugin invoked will match the DriverName set in the ResourceClaimStatus this AllocationResult is embedded in.
    */
    'resourceHandles'?: Array<V1alpha2ResourceHandle>;
    /**
    * Shareable determines whether the resource supports more than one consumer at a time.
    */
    'shareable'?: boolean;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "availableOnNodes",
            "baseName": "availableOnNodes",
            "type": "V1NodeSelector",
            "format": ""
        },
        {
            "name": "resourceHandles",
            "baseName": "resourceHandles",
            "type": "Array<V1alpha2ResourceHandle>",
            "format": ""
        },
        {
            "name": "shareable",
            "baseName": "shareable",
            "type": "boolean",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1alpha2AllocationResult.attributeTypeMap;
    }

    public constructor() {
    }
}
