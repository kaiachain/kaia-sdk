package org.web3j.kaiaAccount;

import java.math.BigDecimal;
import org.json.JSONArray;
import org.json.JSONObject;
import org.web3j.crypto.Keys;
import org.web3j.crypto.transaction.account.AccountKeyPublic;
import org.web3j.utils.Strings;

public class AccountInfo {
	private String address;
	private String balance = "0x0";
	private BigDecimal nonce = BigDecimal.ZERO;
	public JSONObject key;

	public AccountInfo() {
	}

	public AccountInfo(String address) {
		this.address = address;
	}

	public AccountInfo(String address, JSONObject key) {
		this.address = address;
		this.key = key;
	}

	public AccountInfo(String address, String balance, BigDecimal nonce, JSONObject key) {
		this.address = address;
		this.balance = balance;
		this.nonce = nonce;
		this.key = key;
	}

	public JSONObject getKey() {
		return key;
	}

	public int getKeyType() {
		return (int) key.get("keyType");

	}

	public static JSONObject getKeyJSON(JSONObject jsonKey, Accounts accountlist) {

		if (!jsonKey.has("key")) {
			return null;
		}

		int type = 2;
		if (jsonKey.has("keyType")) {
			type = jsonKey.getInt("keyType");
		}

		if (type == 1) {
			((JSONObject) jsonKey.get("key")).put("keyType", type);
			((JSONObject) jsonKey.get("key")).put("key", new JSONObject());
			return jsonKey;
		}

		else if (type == 2) {
			String x = jsonKey.getJSONObject("key").getString("x");
			String y = jsonKey.getJSONObject("key").getString("y");
			AccountKeyPublic accountPublic = AccountKeyPublic.create(x, y);
			String compressed = accountPublic.toCompressedPublicKey();
			String hashed = addHexPrefix(Keys.getAddress(accountPublic.getPublicKey()));
			boolean hasPrivKey = !accountlist.credentialsByPubKey(accountPublic.getPublicKey()).isEmpty();
			JSONObject pubkey = new JSONObject();
			pubkey.put("compressed", compressed);
			pubkey.put("hashed", hashed);
			pubkey.put("hasPrivateKey", hasPrivKey);
			JSONObject key = new JSONObject();
			key.put("pubkey", pubkey);
			key.put("keyType", type);
			jsonKey.put("key", key);

			return jsonKey;
		}

		else if (type == 4) {

			JSONArray keys = jsonKey.getJSONObject("key").getJSONArray("keys");
			for (int n = 0; n < keys.length(); n++) {
				JSONObject object = keys.getJSONObject(n);
				JSONObject result = getKeyJSON(object, accountlist);

				object.put("pubkey", result.getJSONObject("key").getJSONObject("pubkey"));
				object.remove("key");
			}
			return jsonKey;

		} else if (type == 5) {
			JSONArray keys = jsonKey.getJSONArray("key");
			JSONObject jsonKeys = new JSONObject();

			JSONObject transaction = keys.getJSONObject(0);
			JSONObject update = keys.getJSONObject(1);
			JSONObject fee = keys.getJSONObject(2);

			jsonKeys.put("RoleTransaction", getKeyJSON(transaction, accountlist));
			jsonKeys.put("RoleAccountUpdate", getKeyJSON(update, accountlist));
			jsonKeys.put("RoleFeePayer", getKeyJSON(fee, accountlist));

			jsonKey.remove("key");
			jsonKey.put("key", jsonKeys);

			return jsonKey;

		}

		return null;

	}

	public JSONObject getByJSON() {
		JSONObject jsonAll = new JSONObject();
		jsonAll.put("address", this.address);
		jsonAll.put("balance", this.balance);
		jsonAll.put("nonce", this.nonce);
		if (this.key.has("key")) {
			jsonAll.put("key", this.key.get("key"));
		}
		return jsonAll;

	}

	public static String addHexPrefix(String str) {
		if (!isHexPrefixed(str)) {
			return "0x" + str;
		}
		return "0x" + str.substring(2);
	}

	static boolean isHexPrefixed(String str) {
		return !Strings.isEmpty(str) && (str.startsWith("0x") || str.startsWith("0X"));
	}

}