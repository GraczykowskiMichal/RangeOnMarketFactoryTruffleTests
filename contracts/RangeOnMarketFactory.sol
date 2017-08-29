pragma solidity ^0.4.11;

contract RangeOnMarketFactory {

    mapping(bytes32 => ValueIsSet) data;
    bytes32[] keys;

    struct ValueIsSet {
        bytes32 value;
        bool isSet;
    }

    function get(bytes32 key) constant returns (bytes32 value) {
        value =  data[key].value;
    }

    function set(bytes32 key, bytes32 value) {
        if (!data[key].isSet) {
            keys.push(key);
            data[key].isSet = true;
        }
        data[key].value = value;
    }

    //For each even i (starting from 0) in the returned array collection:
    //collection[i] is a key, collection[i+1] is the corresponding value
    function getAll() constant returns (bytes32[] memory collection) {
        collection = new bytes32[](2*keys.length);
        for (uint i = 0; i < keys.length; i++) {
            collection[2*i] = keys[i];
            collection[2*i + 1] = data[keys[i]].value;
        }
    }
}