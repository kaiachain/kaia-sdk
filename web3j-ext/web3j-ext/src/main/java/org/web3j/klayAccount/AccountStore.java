package org.web3j.klayAccount;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;
import org.web3j.crypto.KlayCredentials;

import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KlayGetAccount;
import org.web3j.protocol.core.DefaultBlockParameterName;

import com.fasterxml.jackson.core.JsonProcessingException;

public class AccountStore {
    private final HashMap<String, AccountInfo> AccountLists;

    public AccountStore() {
        this.AccountLists = new HashMap<String, AccountInfo>();
    }

    public boolean refresh(Web3j web3j, Accounts list) throws IOException {
        this.AccountLists.clear();

        Set<String> set = new HashSet<String>();

        for (KlayCredentials element : list.getList()) {
            set.add(element.getAddress());
        }

        for (String element : set) {
            KlayGetAccount acc = web3j.klayGetAccount(element, DefaultBlockParameterName.LATEST).send().getResult();
            if (acc == null) {
                KlayCredentials credentials = list.credentialsByAddress(element).get(0);
                if (!credentials.isDeCoupled()) {
                    JSONObject jsonKey = new JSONObject();
                    jsonKey.put("keyType", 1);
                    jsonKey.put("key", new JSONObject());
                    JSONObject jsonAccount = new JSONObject();
                    jsonAccount.put("key", jsonKey);
                    AccountInfo accountInfo = new AccountInfo(element, jsonAccount);
                    this.AccountLists.put(element, accountInfo);
                }
                continue;
            }

            JSONObject jsonAccount = new JSONObject(acc.getAccount());
            JSONObject jsonKey = AccountInfo.getKeyJSON(jsonAccount.getJSONObject("key"), list);

            if (jsonKey != null) {
                AccountInfo accountInfo = new AccountInfo(element, acc.getAccount().getBalance(), acc.getAccount().getNonce(), jsonKey);
                this.AccountLists.put(element, accountInfo);
            }
        }

        return true;

    }

    public int getType(String address) {
        AccountInfo accountInfo = this.AccountLists.get(address);
        return accountInfo.getKeyType();
    }

    public JSONObject getAccountInfo(String address) throws JsonProcessingException {
        AccountInfo account = this.AccountLists.get(address);
        if (account == null) {
            return new JSONObject();
        }
        return account.getByJSON();
    }

    public JSONArray getAccountInfos() {
        JSONArray jsonArray = new JSONArray();
        for (String key : this.AccountLists.keySet()) {
            jsonArray.put(this.AccountLists.get(key).getByJSON());
        }
        return jsonArray;
    }

    public boolean isInAccountStore(String address) {
        return AccountLists.containsKey(address);
    }

}
